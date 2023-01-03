<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\OneToMany;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource()]
#[Entity]
class ReportFileField extends ReportField
{
    #[OneToMany(mappedBy: 'reportFileField', targetEntity: ReportFileFieldFile::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['reportField:item:read', 'reportField:item:write', 'baseReport:item:read', 'reportTemplate:item:write'])]
    private Collection $reportFileFieldFiles;

    public function __construct()
    {
        $this->reportFileFieldFiles = new ArrayCollection();
    }

    public function addReportFileFieldFile(ReportFileFieldFile $reportFileFieldFile): self
    {
        if (!$this->reportFileFieldFiles->contains($reportFileFieldFile)) {
            $this->reportFileFieldFiles[] = $reportFileFieldFile;
            $reportFileFieldFile->setReportFileField($this);
        }

        return $this;
    }

    public function removeReportFileFieldFile(ReportFileFieldFile $reportFileFieldFile): self
    {
        $this->reportFileFieldFiles->removeElement($reportFileFieldFile);

        return $this;
    }

    /**
     * @return Collection<int, ReportFileFieldFile>
     * */
    public function getReportFileFieldFiles(): Collection
    {
        return $this->reportFileFieldFiles;
    }
}
