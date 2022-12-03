<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;

// @todo does not need to be related to entity, it can be downloaded to a report template page
#[Entity]
class ReportFieldTypeComponent
{
    use IdTrait;

    #[Column(type: 'string', length: 255, nullable: false)]
    private string $name;

    #[Column(type: 'string', length: 255, nullable: false)]
    private string $type;

    /**
     * @var Collection<int,ReportFieldTypeComponentItem>
     * */
    private Collection $reportFieldTypeComponentItems;

    // name of the component -- dashboard component, record-import component
    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }
}
