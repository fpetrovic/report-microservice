<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\ReportSelectableFieldStateProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
    ],
    normalizationContext: ['groups' => ['ReportSelectableField:read']],
    denormalizationContext: ['groups' => ['ReportSelectableField:write']],
)]
#[Post(processor: ReportSelectableFieldStateProcessor::class)]
#[Put(processor: ReportSelectableFieldStateProcessor::class)]
#[Entity]
class ReportSelectableField extends ReportField
{
    /**
     * @var Collection<int, ReportSelectableFieldOption> $reportSelectableFieldOption
     * */
    #[Groups(['baseReport:item:read'])]
    private Collection $reportSelectableFieldOptions;

    public function __construct()
    {
        $this->reportSelectableFieldOptions = new ArrayCollection();
    }

    public function addReportSelectableFieldOption(ReportSelectableFieldOption $reportSelectableFieldOption): self
    {
        if (!$this->reportSelectableFieldOptions->contains($reportSelectableFieldOption)) {
            $this->reportSelectableFieldOptions[] = $reportSelectableFieldOption;
        }

        return $this;
    }

    public function removeReportSelectableFieldOption(ReportSelectableFieldOption $reportSelectableFieldOption): self
    {
        $this->reportSelectableFieldOptions->removeElement($reportSelectableFieldOption);

        return $this;
    }

    /**
     * @return Collection<int, ReportSelectableFieldOption>
     * */
    public function getReportSelectableFieldOptions(): Collection
    {
        return $this->reportSelectableFieldOptions;
    }

    /**
     * @param Collection<int, ReportSelectableFieldOption> $reportSelectableFieldOptions
     */
    public function setReportSelectableFieldOptions(Collection $reportSelectableFieldOptions): void
    {
        $this->reportSelectableFieldOptions = $reportSelectableFieldOptions;
    }
}
