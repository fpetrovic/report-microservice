<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[Entity]
#[InheritanceType('SINGLE_TABLE')]
#[Table('report')]
#[DiscriminatorColumn(name: 'entity_type', type: 'string')]
#[DiscriminatorMap(['report' => 'Report', 'reportTemplate' => 'ReportTemplate'])]
class BaseReport
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[Column(type: 'string', length: 255, nullable: false)]
    #[Assert\Length(min: 2, max: 255)]
    #[Groups(['baseReport:list', 'baseReport:item:read', 'baseReport:item:write'])]
    private string $name;

    #[Column(type: 'boolean')]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    private bool $isArchived = false;

    #[OneToMany(mappedBy: 'report', targetEntity: ReportSection::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    #[Assert\Valid]
    /**
     * @var Collection<int, ReportSection>
     * */
    private Collection $sections;

    public function __construct()
    {
        $this->sections = new ArrayCollection();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function isArchived(): bool
    {
        return $this->isArchived;
    }

    public function setIsArchived(bool $isArchived): void
    {
        $this->isArchived = $isArchived;
    }

    public function getSections(): Collection
    {
        return $this->sections;
    }

    public function setSections(Collection $sections): void
    {
        $this->sections = $sections;
    }

    public function addSection(ReportSection $reportSection): self
    {
        $reportSection->setReport($this);
        $this->sections->add($reportSection);

        return $this;
    }

    public function removeSection(ReportSection $reportSection): self
    {
        $this->sections->removeElement($reportSection);

        return $this;
    }
}
